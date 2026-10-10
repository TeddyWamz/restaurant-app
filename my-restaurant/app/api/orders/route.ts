import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

// These prices are controlled by the server, not the browser.
const menuItems = [
  { id: 1, name: "Grilled Chicken", price: 850 },
  { id: 2, name: "Beef Burger", price: 650 },
  { id: 3, name: "Creamy Pasta", price: 700 },
  { id: 4, name: "Chicken and Rice", price: 600 },
  { id: 5, name: "Classic Cheeseburger", price: 750 },
  { id: 6, name: "Pasta Special", price: 800 },
];

type SubmittedItem = {
  id: number;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid order details." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;

    const { customerName, phone, address, orderType, items } = data;

    // Validate customer details.
    if (
      typeof customerName !== "string" ||
      !customerName.trim() ||
      typeof phone !== "string" ||
      !phone.trim() ||
      phone.trim().length < 7 ||
      phone.trim().length > 20
    ) {
      return NextResponse.json(
        { message: "Please provide a valid name and phone number." },
        { status: 400 }
      );
    }

    // Validate delivery or pickup.
    if (orderType !== "delivery" && orderType !== "pickup") {
      return NextResponse.json(
        { message: "Please choose delivery or pickup." },
        { status: 400 }
      );
    }

    if (
      orderType === "delivery" &&
      (typeof address !== "string" || !address.trim())
    ) {
      return NextResponse.json(
        { message: "Please provide a delivery address." },
        { status: 400 }
      );
    }

    // Validate the selected dishes.
    if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
      return NextResponse.json(
        { message: "Please select at least one menu item." },
        { status: 400 }
      );
    }

    const submittedItems: SubmittedItem[] = [];

    for (const item of items) {
      if (
        !item ||
        typeof item !== "object" ||
        !Number.isInteger(item.id) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > 50
      ) {
        return NextResponse.json(
          { message: "One or more order items are invalid." },
          { status: 400 }
        );
      }

      if (!menuItems.some((menuItem) => menuItem.id === item.id)) {
        return NextResponse.json(
          { message: "An item in your order was not found." },
          { status: 400 }
        );
      }

      // Prevent the same item from being submitted more than once.
      if (submittedItems.some((existing) => existing.id === item.id)) {
        return NextResponse.json(
          { message: "Please submit each menu item only once." },
          { status: 400 }
        );
      }

      submittedItems.push({
        id: item.id,
        quantity: item.quantity,
      });
    }

    // Calculate the total using trusted server-side prices.
    const orderItems = submittedItems.map((item) => {
      const menuItem = menuItems.find(
        (menuItem) => menuItem.id === item.id
      )!;

      return {
        name: menuItem.name,
        price: menuItem.price,
        quantity: item.quantity,
      };
    });

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the order and its items together.
    const order = await prisma.foodOrder.create({
      data: {
        customerName: customerName.trim(),
        phone: phone.trim(),
        address:
          orderType === "delivery" && typeof address === "string"
            ? address.trim()
            : null,
        orderType,
        totalAmount,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json(
      {
        message: "Your order has been saved successfully.",
        order: {
          id: order.id,
          customerName: order.customerName,
          orderType: order.orderType,
          totalAmount: order.totalAmount,
          status: order.status,
          items: order.items,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation failed:", error);

    return NextResponse.json(
      { message: "Unable to save your order. Please try again." },
      { status: 500 }
    );
  }
}


export async function GET(request: Request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return auth.error;
  }

  try {
    const orders = await prisma.foodOrder.findMany({
      include: {
        items: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetching orders failed:", error);

    return NextResponse.json(
      { message: "Unable to retrieve orders." },
      { status: 500 }
    );
  }
}

const allowedStatuses = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "COMPLETED",
  "CANCELLED",
];

export async function PATCH(request: Request) {
  const auth = await requireAdmin(request);

  if (auth.error) {
    return auth.error;
  }
  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Invalid request." },
        { status: 400 }
      );
    }

    const data = body as Record<string, unknown>;
    const { id, status } = data;

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        { message: "A valid order ID is required." },
        { status: 400 }
      );
    }

    if (
      typeof status !== "string" ||
      !allowedStatuses.includes(status)
    ) {
      return NextResponse.json(
        { message: "Please select a valid order status." },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.foodOrder.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      message: "Order status updated successfully.",
      order: updatedOrder,
    });
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { message: "Order not found." },
        { status: 404 }
      );
    }

    console.error("Updating order status failed:", error);

    return NextResponse.json(
      { message: "Unable to update order status." },
      { status: 500 }
    );
  }
}