const lenghtVerification = (min = null, max = null, content) => {
  if (content) {
    if (min && content.length < min) {
      return `Votre contenu doit $etre de minimum ${min} caractères`;
    }

    if (max && content.length > max) {
      return `Votre contenu doit être de maximu ${min} caractères`;
    }
  }
  return null;
};

const ExistVerification = (content) => {
  if (!content) {
    return "Veuillez rentrez du contenu";
  }

  return null;
};

export const errorFor = function (field, errors) {
  const error = errors.find((e) => e.field == field);
  if (error) {
    return error.message;
  } else {
    return null;
  }
};
// array error contains content, field, min,max, exist
export const errorsVerification = (arrayError) => {
  let errorsMessage = [];
  arrayError.forEach((element) => {
    let lenghtError = lenghtVerification(
      element["min"],
      element["max"],
      element["content"]
    );
    let existError = ExistVerification(element["content"]);
    if (lenghtError) {
      errorsMessage.push({ field: element["field"], message: lenghtError });
    } else if (element["exist"] && existError) {
      errorsMessage.push({ field: element["field"], message: existError });
    }
  });
  return errorsMessage;
};
