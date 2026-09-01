
import { getProductsByCategory } from '@/lib/data';

const categories = [
  {value: "all", label: "전체"},
  {value: "digital", label: "디지털"},
  {value: "stationery", label: "문구"},
  {value: "kitchen", label: "주방"}
]


export default async function productsPage({ params }){ // next.js가 page.js에 주는 객체 자체의 이름이 params라서 변경하면 안됨.
  // 현재 전달받은 카테고리로, DB조회해서 가져온다.

  const {category} = params; //최초 all / digistal/ stationery/ kitchen
  const currentCategory = categories.find((cat) => cat.value === category);

  // 선택 category에 해당하는 db조회 로직 
  const products = await getProductsByCategory(category);


  return(
    <>
      <h1>{currentCategory?.label} Page</h1>

      {/* 카테고리 선택 목록 */}
      {/* 선택된 카테고리 상품 목록 */}
    </>
  )
}