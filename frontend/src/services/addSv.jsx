
export const addSv = async (sv, pop) => {

    await fetch("http://localhost:3001/", {
        method: 'POST',
        body: JSON.stringify(sv),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            pop("default", "Thêm sinh viên thành công!")
            // console.log("Success")
        })
        .catch(e => {
            pop("destructive", "Xảy ra lỗi!")
            console.log(e)
        })
}