
//  { description: "Dekripsi wajib diisi", info: "Info wajib diisi" } parse to   describtion: "Dekripsi wajib diisi", info: "Info wajib diisi" \n info: wajib diisi

export const objectToText = (obj: any) => {

  if (typeof obj == 'object' ){
    let text = ''
    Object.keys(obj).forEach((key) => {
      text += `${key}: ${obj[key]}\n`
    })
    return text
  } else {
    return obj
  }
}
