
export function catchErr(err, errSrc = "axios error") {
  console.error(`Catch ${errSrc}: ${err}`)
  alert("請注意：後臺服務發生問題，請稍後再試，如持續發生，請聯絡我們，感謝您。")
}

export function dataErr(response, errSrc = "axios response not success") {
  console.error(`Data ${errSrc}: ${JSON.stringify(response.data)}`)
  alert("請注意：後臺服務資料獲取發生問題，請稍後再試，如持續發生，請聯絡我們，感謝您。")
}

