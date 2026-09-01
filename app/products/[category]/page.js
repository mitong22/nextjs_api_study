
import { getProductsByCategory } from '@/lib/data';
import Link from "next/link";
import { notFound } from "next/navigation";

const categories = [
  {value: "all", label: "전체"},
  {value: "digital", label: "디지털"},
  {value: "stationery", label: "문구"},
  {value: "kitchen", label: "주방"}
]


export default async function productsPage({ params }){ // next.js가 page.js에 주는 객체 자체의 이름이 params라서 변경하면 안됨.
  // 현재 전달받은 카테고리로, DB조회해서 가져온다.

  const {category} = await params; //최초 all / digistal/ stationery/ kitchen
  const currentCategory = categories.find((cat) => cat.value === category);

  if (!currentCategory) {
    notFound();
  }

  // 선택 category에 해당하는 db조회 로직 
  const products = await getProductsByCategory(category);

  // db에서 받아온 값은 바로 그려주고 있음
  return(
    <>
      <h2>{currentCategory.label} 상품</h2>
      <p><strong>Server Component</strong> · Dynamic Segment · MongoDB 조회</p>
      <p><code>/products/[category] → params → MongoDB → HTML</code></p>

      <nav aria-label="상품 카테고리">
        {categories.map((item) => (
          <Link key={item.value} href={`/products/${item.value}`}>
            {item.label}|
          </Link>
        ))}
      </nav>

      <h3>상품 {products.length}개</h3>
      <ul className="result-list">
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> · {product.price.toLocaleString("ko-KR")}원
            <br />
            <small>{product.category} · {product.description}</small>
          </li>
        ))}
      </ul>
    </>
  )
}
