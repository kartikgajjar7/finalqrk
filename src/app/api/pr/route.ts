import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Unauthorized", success: false },
        { status: 403 }
      );
    }

    //get all values from req
    const values = await req.json();

    //check if all values are present
    const requiredFields = {
      title: values.title,
      description: values.description,
      blogId: values.blogId,
      editedContent: values.editedContent,
      initialContent: values.initialContent,
      formTitle: values.formTitle,
      formDescription: values.formDescription,
    };

    const missingField = Object.entries(requiredFields).find(
      ([_, value]) => !value
    );

    //if any value is missing return error
    if (missingField) {
      return NextResponse.json(
        { message: `${missingField[0]} is required.`, success: false },
        { status: 404 }
      );
    }

    const createdPR = await prisma.pullRequest.create({
      data: {
        title: values.formTitle,
        description: values.formDescription,
        blogId: values.blogId,
        status: "PENDING",
        editedContent: values.editedContent,
        createdById: session.user.id,
      },
    });
    console.log(createdPR, "createdpr");
    return NextResponse.json(
      { createdPR, message: "Pullrequest created Successfully", success: true },
      { status: 200 }
    );
    console.log(createdPR, "createdpr");
  } catch (error) {
    console.log("Error creating PR:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Unauthorized", success: false },
        { status: 403 }
      );
    }
    const userid = session.user.id;
    const prs = await prisma.pullRequest.findMany({
      where: {
        createdById: userid,
      },
      include: {
        blog: {
          select: {
            title: true,
            owner: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    console.log("prs is", prs);
    return NextResponse.json(
      { prs, message: "Pullrequests fetched Successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching PRS:", error);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
