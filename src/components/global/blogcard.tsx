interface BlogCardProps {
  title: string;

  date: string;
  image: string;
}
export default function BlogCard() {
  return (
    <div className="p-2">
      <div className="border border-gray-700 rounded-lg overflow-hidden flex flex-col w-[170px] h-[170px] transition-transform hover:scale-105 shadow-md hover:shadow-lg">
        <div className="w-full h-[50px] bg-gradient-to-r from-[#2C2C2C] to-[#3A3A3A]"></div>
        <div className="px-3 py-2 flex flex-col gap-2 bg-[#252525] h-full w-full">
          <p className="text-[10px] text-blue-400 mb-0.5">NextAuth</p>
          <h1 className="text-xs font-bold leading-tight mb-1">
            This is title of that blog related to next auth
          </h1>

          <p className="text-[10px] text-gray-300  line-clamp-2">
            A short excerpt or description of this blog post...
          </p>

          <div className="flex justify-between items-center">
            <p className="text-[10px] text-gray-400">8 hours ago</p>
            <div className="flex items-center">
              <span className="text-[10px] text-gray-400 mr-1">12</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
