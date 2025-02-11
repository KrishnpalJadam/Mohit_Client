// ** Next, React And Locals Imports
import { useState } from "react";
import { addProductReviewAPI } from "@/actions/products.actions.js";
import { FormTextArea } from "@/helpers/FormFields";
import { isRequired } from "@/helpers/FormValidators";
import CapitalizeText from "@/helpers/CapitalizeText";
import ToastStatus from "@/components/Toaster/ToastStatus";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DropzoneSingle from "./DropzoneSingle";
import useStyles from "./styles.js";

// ** MUI Imports
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// ** Third Party Imports
import { Form, Field } from "react-final-form";
import { MdClose } from "react-icons/md";

export default function AddReview({ dict, products, orderId, closeModal }) {
  const { classes } = useStyles();

  // States
  const [product, setProduct] = useState(products[0]?.productId);
  const [rating, setRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // To change product
  const handleChange = (event) => {
    setProduct(event.target.value);
  };

  // To set rating
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  // Adding the review
  const submit = async (values) => {
    setIsLoading(true);

    const valuesObject = {
      productId: product,
      review: {
        orderId,
        rating: parseInt(rating),
        comment: values.comment,
        media: values.media,
      },
    };

    if (!rating) {
      ToastStatus("Error", "Please rate a product");
    } else {
      if (product && orderId) {
        const response = await addProductReviewAPI(valuesObject);

        if (response?.status === 200) {
          closeModal(false);
          ToastStatus("Success", response.message);
        } else {
          ToastStatus("Error", response.message);
        }
      } else {
        ToastStatus("Error", "Please choose a product to review");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className={classes.modalCtn}>
      <Paper className={classes.modal}>
        <MdClose
          className={classes.closeIcon}
          onClick={() => closeModal(false)}
        />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          {dict.account.reviewProducts}:
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select value={product} onChange={handleChange}>
            {products?.map((product, index) => (
              <MenuItem key={index} value={product.productId}>
                {CapitalizeText(product.name)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div>
          <Typography variant="subtitle1">
            {dict.account.reviewRateText}:
          </Typography>
          <Rating
            value={rating}
            size="large"
            onChange={(e) => handleRating(e)}
            className={classes.ratingIcon}
          />
        </div>
        <Form onSubmit={submit}>
          {({ handleSubmit, invalid }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {dict.account.reviewContent}:
              </Typography>
              <div className={classes.formField}>
                <Field
                  name="comment"
                  component={FormTextArea}
                  validate={isRequired}
                  rows={4}
                  placeholder={dict.account.reviewContentText}
                />
              </div>
              <Typography variant="subtitle1" sx={{ mt: 2 }}>
                {dict.account.reviewShareImage}:
              </Typography>
              <div className={classes.formField}>
                <Field name="media">
                  {(props) => <DropzoneSingle dict={dict} {...props.input} />}
                </Field>
              </div>
              <div className={classes.btn}>
                <PrimaryButton
                  type="submit"
                  disabled={invalid}
                  text={dict.account.reviewSubmit}
                  spinner={isLoading}
                />
              </div>
            </form>
          )}
        </Form>
      </Paper>
    </div>
  );
}
