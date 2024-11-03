import { db } from "@/lib/firebase";
import { Size } from "@/type-db";
import { auth } from "@clerk/nextjs/server";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

// Hàm helper để thêm CORS headers
const withCORS = (response: NextResponse) => {
  response.headers.set("Access-Control-Allow-Origin", "*"); // Cho phép tất cả các nguồn
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Các phương thức cho phép
  response.headers.set("Access-Control-Allow-Headers", "Content-Type"); // Các tiêu đề được phép
  return response;
};

export const POST = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return withCORS(new NextResponse("Unauthorized", { status: 404 }));
    }

    const body = await req.json();
    const { name, value } = body;

    if (!name) {
      return withCORS(new NextResponse("Size name is required", { status: 402 }));
    }
    if (!value) {
      return withCORS(new NextResponse("Size value is required", { status: 402 }));
    }
    if (!params.storeId) {
      return withCORS(new NextResponse("Store not found", { status: 404 }));
    }

    const store = await getDoc(doc(db, "stores", params.storeId));
    if (store.exists()) {
      let storeData = store.data();
      if (storeData?.userId !== userId) {
        return withCORS(new NextResponse("Unauthorized", { status: 405 }));
      }
    }

    const sizeData = {
      name,
      value,
      createdAt: serverTimestamp(),
    };

    const sizeRef = await addDoc(
      collection(db, "stores", params.storeId, "sizes"),
      sizeData
    );
    const id = sizeRef.id;

    await updateDoc(doc(db, "stores", params.storeId, "sizes", id), {
      ...sizeData,
      id,
      updatedAt: serverTimestamp(),
    });

    return withCORS(NextResponse.json({ id, ...sizeData }));
  } catch (error) {
    return withCORS(new NextResponse("Internal server error", { status: 500 }));
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { storeId: string } }
) => {
  try {
    if (!params.storeId) {
      return withCORS(new NextResponse("Store not found", { status: 404 }));
    }

    const sizeData = (
      await getDocs(collection(doc(db, "stores", params.storeId), "sizes"))
    ).docs.map((doc) => doc.data()) as Size[];

    return withCORS(NextResponse.json(sizeData));
  } catch (error) {
    return withCORS(new NextResponse("Internal server error", { status: 500 }));
  }
};
