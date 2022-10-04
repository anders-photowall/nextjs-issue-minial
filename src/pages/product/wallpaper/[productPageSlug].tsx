import type { GetStaticPaths, GetStaticProps } from "next";
import getConfig from "next/config";
import { useRouter } from "next/router";
import React from "react";
import PageContent from "../../../common/components/layout/PageContent";
import ProductPageContent, {
  IProduct,
} from "../../../common/components/layout/pages/product_page/ProductPageContent";

interface IWallpaperProductPageProps {
  product: IProduct;
}

const WallpaperProductPage: React.FC<IWallpaperProductPageProps> = ({
  product,
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Building page serverside...</div>;
  }
  return (
    <PageContent>
      <ProductPageContent
        product={product}
        productType="wallpaper"
      ></ProductPageContent>
    </PageContent>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  // When this is true (should be set in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  // Here I plan getting top 100/1000 something product pages.
  // const response = {
  //   data: {
  //     products: {
  //       items: [{ path: "static-product" }],
  //     },
  //   },
  // };

  // This is kept for reference as to why I need to supply a locale to paths.
  // const { serverRuntimeConfig } = getConfig();
  // const paths = [] as { params: { productPageSlug: string }; locale: string }[];
  // if (context.locales) {
  //   context.locales.forEach((locale) => {
  //     if (locale !== "default") {
  //       const lang = locale.indexOf("-") !== -1 ? locale.split("-")[1] : locale;
  //       const pathSuffix =
  //         serverRuntimeConfig.pw.i18n.languages[lang].productPathSuffix
  //           .wallpaper;
  //       const pathsForLocale = response.data.products.items.map(
  //         (item: { path: string }) => {
  //           return {
  //             params: {
  //               productPageSlug: `${item.path}-${pathSuffix}`,
  //             },
  //             locale: locale,
  //           };
  //         }
  //       );
  //       paths.push(...pathsForLocale);
  //     }
  //   });
  // }

  const paths = [
    {
      params: { productPageSlug: "static-product-wallpaper" },
      locale: "us", // commenting out this row removes the issue.
    },
  ];

  return {
    paths: paths,
    fallback: "blocking",
  };
};

// `getStaticPaths` requires using `getStaticProps`
export const getStaticProps: GetStaticProps<
  IWallpaperProductPageProps
> = async (context) => {
  const locale = context.locale as string;

  if (!context.params?.productPageSlug) {
    return {
      notFound: true,
    };
  }

  const productPageSlug = context.params.productPageSlug as string;

  const productData = {
    id: 43894,
  };
  try {
    const product = {
      path: productPageSlug,
      id: productData.id,
    };

    return {
      props: {
        product: product,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default WallpaperProductPage;
