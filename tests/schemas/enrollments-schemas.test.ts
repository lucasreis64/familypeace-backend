import { updateEnrollmentSchema } from "@/schemas";
import { generateCPF, getStates } from "@brazilian-utils/brazilian-utils";
import { faker } from "@faker-js/faker";

describe("updateEnrollmentSchema", () => {
  const generateValidInput = () => ({
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
    phone: "(21) 98999-9999",
    profilePicture: faker.internet.url(),
  });

  it("should return an error if input is not present", () => {
    const result = updateEnrollmentSchema.validate(null);

    expect(result.error).toBeDefined();
  });

  describe("name", () => {
    it("should return error if name is not present", () => {
      const input = generateValidInput();
      delete input.name;

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is less than 3 characters", () => {
      const input = generateValidInput();
      input.name = faker.lorem.word(2);

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if name is more than 30 characters", () => {
      const input = generateValidInput();
      input.name = faker.lorem.word(31);

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("birthday", () => {
    it("should return error if birthday is not present", () => {
      const input = generateValidInput();
      delete input.birthday;

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return an error if birthday is not an iso date", () => {
      const input = generateValidInput();
      input.birthday = "not an iso date";

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("phone", () => {
    it("should return error if phone is not present", () => {
      const input = generateValidInput();
      delete input.phone;

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if phone is not a mobile phone", () => {
      const input = generateValidInput();
      input.phone = "1234567890";

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if phone is not masked", () => {
      const input = generateValidInput();
      input.phone = "12999887766";

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("profilePicture", () => {
    it("should return error if profilePicture is not present", () => {
      const input = generateValidInput();
      delete input.profilePicture;

      const { error } = updateEnrollmentSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if schema is valid", () => {
    const input = generateValidInput();

    const { error } = updateEnrollmentSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
