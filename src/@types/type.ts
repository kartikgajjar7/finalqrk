export interface BlogResponse {
  document?: any; // Replace with your actual blog type
  message: string;
  success: boolean;
}

export interface BlogOwner {
  name: string;
  image: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  owner: BlogOwner;
}
export interface PRcardProps {
  prtitle: string;
  blogTitle: string;
  author: string;
  authorUsername: string;
  date: string; // or `Date` if you're working with actual Date objects
  status: string; // consider using a union type if status has specific values like 'pending' | 'approved' | 'rejected'
}
export interface PullRequestChipProps {
  id: string;
  title: string;
  Blog: string;
  status: "open" | "closed" | "merged";
  date: string;
}
