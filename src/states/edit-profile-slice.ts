import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type AddressField = {
  fullAddress: string;

  country?: string;
  city?: string;
  postalCode?: string;
  street?: string;
  houseNumber?: string;
  additionalAddress?: AddressField;
};

export type ProfileFields = {
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  address: AddressField;
};

interface EditProfileState extends ProfileFields {
  // ProfileFields
  updateProfile: (key: keyof ProfileFields, value: string) => void;
  batchUpdateProfile: (updates: Partial<ProfileFields>) => void; // update multiple fields

  resetProfile: () => void;
}

export const useEditProfileState = create<EditProfileState>()(
  devtools((set) => ({
    firstName: "",
    lastName: "",
    fullName: "",
    email: "",
    phone: "",
    address: {
      fullAddress: "",
    },

    updateProfile: (key, value) => {
      set({ [key]: value }, undefined, "editProfile/update");
    },
    batchUpdateProfile: (updates) => {
      set(
        (state) => ({ ...state, ...updates }),
        undefined,
        "editProfile/batchUpdate"
      );
    },
    resetProfile: () => {
      set(
        {
          firstName: "",
          lastName: "",
          fullName: "",
          email: "",
          phone: "",
          address: {
            fullAddress: "",
          },
        },
        undefined,
        "editProfile/reset"
      );
    },
  }))
);
