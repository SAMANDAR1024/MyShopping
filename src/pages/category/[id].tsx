"use client";
import ProductCard from "@/components/layout/ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoriesPage } from "@/store/types";
import axios from "axios";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function CategorieProduct() {
  const [categoriaPage, setCategoriaPage] = useState<CategoriesPage>();
  const searchParams = useSearchParams();
  const params = useParams();
  const id = params?.id;
  const currentPage = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 4;
  useEffect(() => {
    if (!id) return;
    axios
      .get(
        `https://nt.softly.uz/api/front/products?categoryId=${id}&page=${currentPage}&limit=${limit}`
      )
      .then((res) => {
        setCategoriaPage(res.data);
      });
  }, [id, currentPage, limit]);

  if (!id) return <div>ID topilmadi</div>;

  if (!categoriaPage) {
    return (
      <div className="cssload-container">
        <ul className="cssload-flex-container">
          <li>
            <span className="cssload-loading cssload-one"></span>
            <span className="cssload-loading cssload-two"></span>
            <span className="cssload-loading-center"></span>
          </li>
        </ul>
      </div>
    );
  }

  if (categoriaPage.totalItems === 0) {
    return (
      <div className="mx-auto container text-center mt-20 text-4xl ">
        Malumot yoq
      </div>
    );
  }

  const total = Math.ceil(categoriaPage.totalItems / 4);

  return (
    <div className="flex flex-wrap justify-around gap-10 container w-full mx-auto px-16 py-4">
      {categoriaPage.items.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}

      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <Link
              href={`/category/${id}?page=${currentPage - 1}&limit=${limit}`}
            >
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>
            </Link>
          )}
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </PaginationItem>
          {currentPage < total && (
            <Link
              href={`/category/${id}?page=${currentPage + 1}&limit=${limit}`}
            >
              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </Link>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CategorieProduct;
