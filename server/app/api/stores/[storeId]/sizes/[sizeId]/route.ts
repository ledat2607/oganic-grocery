import { db } from "@/lib/firebase";
import { Billboards, Category, Size } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Un_authorization", { status: 404 });
    }

    const body = await req.json();

    if (!body) {
      return new NextResponse("Request body is required", { status: 400 });
    }

    const { name, value } = body;
    if (!name) {
      return new NextResponse("Size name is required", { status: 402 });
    }
    if (!value) {
      return new NextResponse("Size value is required", { status: 402 });
    }
    if (!params.storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));

    if (store.exists()) {
      const storeData = store.data();
      if (storeData?.userId !== userId) {
        return new NextResponse("Un_authorized", { status: 405 });
      }
    } else {
      return new NextResponse("Store not found", { status: 404 });
    }

    const SizeRef = doc(db, "stores", params.storeId, "sizes", params.sizeId);
    const SizeDoc = await getDoc(SizeRef);

    if (!SizeDoc.exists()) {
      return new NextResponse("Size not found", { status: 401 });
    }

    // Update the Size
    await updateDoc(SizeRef, {
      name,
      value,
      updatedAt: serverTimestamp(),
    });

    const updatedSize = (await getDoc(SizeRef)).data() as Size;

    return NextResponse.json(updatedSize);
  } catch (error) {
    console.error("Error in PATCH:", error); // Log the error
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { storeId: string; sizeId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store not found", { status: 404 });
    }
    if (!params.sizeId) {
      return new NextResponse("Size not found", { status: 404 });
    }

    const store = await getDoc(doc(db, "stores", params.storeId));
    if (!store.exists()) {
      return new NextResponse("Store not found", { status: 404 });
    }

    let storeData = store.data();
    if (storeData?.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 403 }); // Sử dụng status 403 cho không có quyền truy cập
    }

    const sizeRef = doc(
      db,
      "stores",
      params.storeId,
      "sizes",
      params.sizeId
    );
    const sizeSnapshot = await getDoc(sizeRef);

    if (!sizeSnapshot.exists()) {
      return new NextResponse("Billboard not found", { status: 404 });
    }

    await deleteDoc(sizeRef);

    return new NextResponse("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
