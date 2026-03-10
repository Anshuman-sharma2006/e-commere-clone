import { Loader2, LoaderCircleIcon } from "lucide-react"
export default function AdminLoading() {
    return (
<div className="flex justify-center self-center bg-white dark:bg-black">
  <Loader2 className="animate-spin text-black dark:text-white w-6 h-6" />
</div>
    )
}