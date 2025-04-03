'use client'

export default function SendBouttn() {
    
    const send = ()=>{
        alert('تم الارسا بنجاح') 
    }
  return (
    <button onClick={send} type="submit" className="p-3 bg-green-700 text-white rounded-md hover:bg-green-500">
    إرسال
  </button>
  )
}
