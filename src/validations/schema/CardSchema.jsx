//rules for validating the form
import * as Yup from "yup";

const FlashCardSchema = Yup.object().shape({
  groupid: Yup.string(),
  groupname: Yup.string()
    .max(25, "Must be less than 25 characters")
    .min(3, "Group Name Must be More Than 3 Characters")
    .required("Enter Group Name !"),
  groupdescription: Yup.string().max(
    300,
    " Group Description Must be less than 300 characters"
  ),

  groupimg: Yup.mixed(),

  cards: Yup.array().of(
    Yup.object().shape({
      cardid: Yup.string(),
      cardname: Yup.string()
        .max(25, "Must be less than 25 characters")
        .min(3, "Group Name Must be More Than 3 Characters")
        .required(" Input Required !"),
      carddescription: Yup.string()
        .min(15, "Must be more than 15 characters")
        .max(400, " Must be less than 400 characters")
        .required(" Input Required !"),
    })
  ),
  createdOn: Yup.date().default(() => new Date()),
});

export default FlashCardSchema;
