import { auth } from "@/auth";
import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //session fetch kr ra

    const session = await auth();

    // session valid hai ya nai wo dekhra
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Unauthorized", success: false },
        { status: 403 }
      );
    }

    //needed feilds hai ki nai wo dekhra
    const values = await req.json();

    if (!values.title || !values.content) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 400 }
      );
    }
    const stringcontent = JSON.stringify(values.content) as string;
    const document = await prisma.blog.create({
      data: {
        title: values.title,
        content: stringcontent,
        length: 0,
        owner: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(
      { document, message: "Blog created successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating document:", error);

    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    // Read query parameters from URL
    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return NextResponse.json(
        { message: "Missing BlogId", success: false },
        { status: 400 }
      );
    }
    //FETCH NEEDED STUFFS
    const fetchedBlog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        owner: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    if (!fetchedBlog) {
      return NextResponse.json(
        { message: "Blog not Found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        document: fetchedBlog,
        message: "Blog fetched successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Occured while fetching blog", error);
    return NextResponse.json(
      { message: "Error Occured while fetching blog", success: false },
      { status: 500 }
    );
  }
}
