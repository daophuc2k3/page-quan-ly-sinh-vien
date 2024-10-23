import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { deleteSv } from "@/services/deleteSv"
import { fetchAll } from "@/services/fetchAll"
import { useState } from "react"

export const DeleteSV = ({ id, name, mssv, svs, setSVs, pop, page, cap, total, setTotal }) => {
    const [open, setOpen] = useState(false)

    const handleDelete = async () => {
        await deleteSv(id, pop)
            .then(async () => await fetchAll(page, cap, svs, setSVs, total, setTotal)
                .then(() => setOpen(false)))
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} variant="destructive">Xóa</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className={"text-center"}>Xác nhận xóa sinh viên</DialogTitle>
                    <DialogDescription className={"text-center"}>
                        {`Xác nhận xóa sinh viên ${name}, MSSV: ${mssv}`}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className={"sm:justify-around"}>
                    <Button onClick={() => setOpen(false)}  >Hủy</Button>
                    <Button onClick={handleDelete} variant="destructive">Xóa</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
