import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import './App.css'
import { addSv } from './services/addSv'
import { EditSV } from './modal/editDialog'
import { handleChangeInput } from './utilities/changeInput'
import { fetchAll } from './services/fetchAll'
import { DeleteSV } from './modal/deleteDialog'
import { toast, useToast } from './hooks/use-toast'
import { Label } from '@radix-ui/react-label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { checkInfo } from './utilities/checkInputs'
import { searchSv } from './utilities/checkSvExist'



const App = () => {
  const defaultSv = { Name: "", StudentID: "", Address: "", Birthday: "" }
  const defaultCheck = { mssv: true, name: true, birth: true }
  const [svs, setSVs] = useState([])
  const [sv, setSV] = useState(defaultSv)
  const { toast } = useToast()
  const [page, setPage] = useState(0)
  const [cap, setCap] = useState(5)
  const [total, setTotal] = useState(0)
  const [pageCnt, setPageCnt] = useState(0)
  const [valid, setValid] = useState(defaultCheck)


  useEffect(() => {
    fetchAll(page, cap, svs, setSVs, total, setTotal)
  }, [page, cap])


  useEffect(() => {
    setPageCnt(Math.ceil(total / cap))
  }, [total, cap])

  const pop = (variant, title) => {
    toast({
      variant,
      title,
      duration: 2000,
    })
  }


  const handleAdd = async () => {
    setValid(defaultCheck)
    if (!checkInfo(sv, valid, setValid)) {
      // console.log(valid)
      pop("destructive", "Không được để trống MSSV, Họ tên và Ngày sinh!")
      return
    } else {

      let std = await searchSv(sv.StudentID)
      if (!std || !std.data) {
        // console.log(std)
        await addSv(sv, pop)
        setSV(defaultSv)
        setValid(defaultCheck)
        await fetchAll(page, cap, svs, setSVs, total, setTotal)
      } else {
        // console.log(std)
        setValid(pre => ({ ...pre, mssv: false }))
        pop("destructive", "Đã có sinh viên với mssv này trong hệ thống!")
      }

    }
  }


  return (
    <>
      <div>
        <div className="headBanner">Quản lý sinh viên</div>
        <div className="screen">
          <div className="inputContainer">
            <div className="upperAdd">
              <Input
                type="number"
                placeholder="MSSV"
                className={!valid.mssv && "border-red-400 border-2"}
                value={sv.StudentID}
                onChange={(e) => handleChangeInput(e.target.value, 'StudentID', sv, setSV)}
              />
              <Input
                type="text"
                placeholder="Họ tên"
                className={!valid.name && "border-red-400 border-2"}
                value={sv.Name}
                onChange={(e) => handleChangeInput(e.target.value, 'Name', sv, setSV)}

              />
              <Input
                type="text"
                placeholder="Địa chỉ"
                value={sv.Address}
                onChange={(e) => handleChangeInput(e.target.value, 'Address', sv, setSV)}

              />
              <div className='flex justify-around items-center'>

                <label htmlFor="">Ngày sinh</label>
                <input className={`datee ${!valid.birth && "border-red-400 border-2"}`} type='date' value={sv.Birthday}

                  onChange={(e) => handleChangeInput(e.target.value, 'Birthday', sv, setSV)}
                />
              </div>
              <Button
                onClick={handleAdd}
              >Thêm sinh viên</Button>
            </div>
          </div>

          <div className="tablecontainer">
            <div className="pagination flex justify-between items-center mb-2 px-1 flex-wrap ">
              <div className='flex justify-center items-center flex-wrap gap-5'>

                <div className="flex justify-center items-center gap-2">
                  <Label>Số sinh viên trong 1 trang:</Label>
                  <Select onValueChange={setCap} value={cap}>
                    <SelectTrigger className="w-[4rem]">
                      <SelectValue placeholder="Count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={5}>5</SelectItem>
                      <SelectItem value={10}>10</SelectItem>
                      <SelectItem value={15}>15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tổng số sinh viên:</Label>
                  <Button variant="ghost">{total}</Button>
                </div>

              </div>
              <div >
                <Button
                  onClick={() => setPage(pre => pre - 1 < 0 ? 0 : pre - 1)}
                  variant="outline" className="w-[5rem]">← Trước</Button>
                <Button variant="ghost">{page + 1}{" / "}{pageCnt}</Button>
                <Button
                  onClick={() => {
                    if (page + 1 < total / cap) setPage(pre => pre + 1)
                  }}
                  variant="outline" className="w-[5rem]">Sau →</Button>
              </div>
            </div>

            <Table className="border-2 ">
              <TableCaption>
                Bảng thông tin sinh viên
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">MSSV</TableHead>
                  <TableHead className="w-[20rem]">Họ tên</TableHead>
                  <TableHead className="w-[10rem]">Ngày sinh</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {svs.map(each => {
                  return (
                    <TableRow key={each._id}>
                      <TableCell className="font-medium">{each.StudentID}</TableCell>
                      <TableCell>{each.Name}</TableCell>
                      <TableCell>{each.Birthday?.substring(0, 10)}</TableCell>
                      <TableCell>{each.Address}</TableCell>
                      <TableCell className="flex justify-end gap-1">
                        <EditSV sv={each} svs={svs} setSVs={setSVs} pop={pop}
                          total={total} setTotal={setTotal}
                          page={page} cap={cap}
                        />
                        <DeleteSV id={each._id} name={each.Name}
                          mssv={each.StudentID} pop={pop}
                          svs={svs} setSVs={setSVs}
                          total={total} setTotal={setTotal}
                          page={page} cap={cap}
                        />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>

          </div>
        </div>

      </div>
    </>
  )
}

export default App
