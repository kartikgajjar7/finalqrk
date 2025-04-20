"use client";
import { Blog, BlogResponse } from "@/@types/type";
import axios from "axios";
import { Block } from "@blocknote/core";

const blogApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const editApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
export async function createBlogPost(title: string, content: Block[]) {
  try {
    const { data } = await blogApi.post("/document", { title, content });
    return data;
  } catch (error) {
    let errorMessage = "Request failed. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}

export async function fetchBlog(blogId: string): Promise<Blog> {
  try {
    const { data } = await blogApi.get<BlogResponse>("/document", {
      params: { blogId },
    });

    if (!data.success || !data.document) {
      throw new Error(data.message || "Blog data not available");
    }
    return data.document;
  } catch (error) {
    let errorMessage = "Failed to fetch blog";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Blog fetch error:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function fetchPRs() {
  try {
    const { data } = await blogApi.get("/pr");
    console.log(data, "pr fetch ho gai hai");
    if (data.success) return data.prs;
  } catch (error) {
    console.log(error);
  }
}

export async function createEditRequest(
  blogId: string,
  editedContent: string,
  initialContent: string,
  contributorId: string,
  title: string,
  description: string,
) {
  try {
    const res = await editApi.post("/pr", {
      blogId,
      editedContent,
      title,
      description,
      initialContent,
      contributorId, // optional if handled via session
      formTitle: title,
      formDescription: description,
    });
    console.log(res);
    return res;
  } catch (error) {
    let errorMessage = "Failed to Create PR";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("PR CREATE ERROR:", errorMessage);
    throw new Error(errorMessage);
  }
}
