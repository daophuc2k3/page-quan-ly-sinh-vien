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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleChangeInput } from "@/utilities/changeInput"
import { checkInfo } from "@/utilities/checkInputs"
import { updateSV } from "@/services/editSV"
import { fetchAll } from "@/services/fetchAll"
import _ from "lodash"
import { useState } from "react"
import { searchSv } from "@/utilities/checkSvExist"

export const EditSV = ({ sv, svs, setSVs, pop, page, cap, total, setTotal }) => {
    const defaultCheck = { mssv: true, name: true, birth: true }
    const [curr, setCurr] = useState(sv)
    const [open, setOpen] = useState(false)
    const [valid, setValid] = useState(defaultCheck)
    const pre = _.cloneDeep(sv)

    const checkChange = () => {
        return pre.StudentID != +curr.StudentID ||
            pre.Name !== curr.Name ||
            pre.Address !== curr.Address ||
            pre.Birthday != curr.Birthday
    }

    const handleUpdate = async () => {
        setValid(defaultCheck)
        if (checkInfo(curr, valid, setValid)) {
            setValid(defaultCheck)
            if (checkChange) {
                if (pre.StudentID != +curr.StudentID) {
                    let std = await searchSv(curr.StudentID)
                    if (std && std.data) {
                        setValid(pre => ({ ...pre, mssv: false }))
                        pop("destructive", "Đã có sinh viên với mssv này trong hệ thống!")
                        return
                    }
                }

                await updateSV(curr, pop)
                    .then(async () => await fetchAll(page, cap, svs, setSVs, total, setTotal)
                        .then(() => setOpen(false)))

            }
        } else {
            pop("destructive", "Không được bỏ trống MSSV, Họ tên và Ngày sinh!")
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)} className="bg-yellow-400" >Sửa</Button>
            </DialogTrigger>
            <DialogContent
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
                className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sửa thông tin sinh viên</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            MSSV
                        </Label>
                        <Input
                            id="mssv"
                            type="number"
                            value={curr.StudentID}
                            className={`col-span-3 ${!valid.mssv && "border-2 border-red-400"}`}
                            onChange={(e) => handleChangeInput(e.target.value, 'StudentID', curr, setCurr)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Họ tên
                        </Label>
                        <Input
                            id="name"
                            defaultValue={curr.Name}
                            className={`col-span-3 ${!valid.name && "border-2 border-red-400"}`}
                            onChange={(e) => handleChangeInput(e.target.value, 'Name', curr, setCurr)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Địa chỉ
                        </Label>
                        <Input
                            id="address"
                            defaultValue={curr.Address}
                            className="col-span-3"
                            onChange={(e) => handleChangeInput(e.target.value, 'Address', curr, setCurr)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Ngày sinh
                        </Label>
                        <input className={`datee col-span-3 ${!valid.birth && "border-2 border-red-400"}`} type='date'
                            value={curr.Birthday?.substring(0, 10)}
                            onChange={(e) => handleChangeInput(e.target.value, 'Birthday', curr, setCurr)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleUpdate}>Lưu thông tin</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
