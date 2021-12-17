import { InvalidPropertyError } from "../../common/exceptions/errors";
import { RequiredParam } from "../../common/exceptions/required.param";
import { ReporterCreateDto } from "./../../dtos/reporter.dto";

export const makeReporter = (
  reporterinfo: ReporterCreateDto
) => {
    if(Object.keys(reporterinfo).length == 0){
        RequiredParam("Reporter Info");
    }    

  const validatedReporter = ValidateReporterInfo(reporterinfo);
  return Object.freeze(validatedReporter);
};

function ValidateReporterInfo({
  name = RequiredParam('Name'),
  user_name = RequiredParam('User_Name'),
  email = RequiredParam('Email'),
  password = RequiredParam('Password'),
}: ReporterCreateDto) {
  ValidateName(name);
  ValidateEmail(email);
  ValidateUserName(user_name, name);
  ValidatePassword(password);

  return {
    name,
    user_name,
    email,
    password,
  } as ReporterCreateDto;
}

function ValidateName(name: string) {
  if (name.length <= 3) {
    throw new InvalidPropertyError("Name cannot be less than 3 characters");
  }
}

function ValidateEmail(email: string) {
  const valid = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  if (!valid.test(email)) {
    throw new InvalidPropertyError(
      "Insert a valid email (example@example.com)"
    );
  }
}

function ValidateUserName(user_name: string, name: string) {
  if (user_name === name) {
    throw new InvalidPropertyError("User Name and name cannot be the same");
  }

  if (user_name.length <= 5) {
    throw new InvalidPropertyError(
      "User Name cannot be less than 5 characters"
    );
  }
}

function ValidatePassword(password: string) {
  const valid = new RegExp(
    /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[A-Z]){1})(?=(?:.*[@!#$%^&*-]){1})\S{8,16}$/
  );
  if (!valid.test(password)) {
    throw new InvalidPropertyError(
      "Password must contain at least: 1 uppercase, 1 especial character and a length minimum of 8 up to 16"
    );
  }
}
