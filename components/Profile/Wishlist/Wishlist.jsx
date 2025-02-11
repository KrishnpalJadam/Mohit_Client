"use client";

// ** Next, React And Locals Imports
import { useRouter } from "next/navigation";
import { customersAPI } from "@/actions/customers.actions.js";
import Cards from "@/components/Products/Cards";
import Toaster from "@/components/Toaster/Toaster";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import useStyles from "./styles.js";

// ** MUI Imports
import Typography from "@mui/material/Typography";

export default function Wishlist({ dict, products, productSettings }) {
  const { classes } = useStyles();
  const router = useRouter();

  // Remove product from wishlist
  const handleRemove = async (id) => {
    const productIds = [];

    products.map((product) => productIds?.push(product._id));

    const filteredWishlist = productIds?.filter((productId) => {
      return productId !== id;
    });

    const valuesObject = {
      wishlist: filteredWishlist,
    };

    const response = await customersAPI(valuesObject);

    if (response?.status === 200) {
      ToastStatus("Success", "Removed from wishlist");
      router.refresh();
    } else {
      ToastStatus("Error", "Error Occurred");
    }
  };

  return (
    <div className={classes.container}>
      <Toaster />
      <div>
        <Typography variant="h4">
          {products?.length > 0 && (
            <>
              {dict.account.wishlistTitle +
                " ( " +
                products?.length +
                " " +
                dict.account.wishlistItemsText +
                " ) "}
            </>
          )}
        </Typography>
        <div className={classes.products}>
          <Cards
            products={products}
            productSettings={productSettings}
            isWishlist={handleRemove}
          />
        </div>
      </div>
      {!products?.length > 0 && (
        <div className={classes.noItems}>
          <Typography variant="h3" sx={{ pb: 4 }}>
            {dict.account.wishlistNoItems}
          </Typography>
          <Typography variant="subtitle1" sx={{ pb: 3 }}>
            {dict.account.wishlistNoItemsContent}
          </Typography>
          <PrimaryButton href="/shop/all" text={dict.account.wishlistBrowse} />
        </div>
      )}
    </div>
  );
}
