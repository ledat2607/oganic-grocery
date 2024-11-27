import { db } from "@/lib/firebase";
import { Store } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID not provided", { status: 400 });
    }

    // Parse body
    const body = await req.json();
    if (body.withdraw <= 0) {
      return new NextResponse("Invalid withdraw amount", { status: 400 });
    }

    // Get Firestore document reference
    const docRef = doc(db, "stores", params.storeId);

    // Check if document exists
    const storeDoc = await getDoc(docRef);
    if (!storeDoc.exists()) {
      return new NextResponse("Store not found", { status: 404 });
    }

    // Get current withdraw value
    const currentData = storeDoc.data() as Store;
    const currentWithdraw = currentData.withdraw || 0;

    // Calculate new withdraw value
    const newWithdraw = currentWithdraw + body.withdraw;

    // Update the `withdraw` field in Firestore
    await updateDoc(docRef, {
      withdraw: newWithdraw,
      updatedAt: serverTimestamp(),
    });

    // Fetch updated data
    const updatedStore = (await getDoc(docRef)).data() as Store;

    return NextResponse.json(updatedStore);
  } catch (error) {
    console.error("Error updating withdraw:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
