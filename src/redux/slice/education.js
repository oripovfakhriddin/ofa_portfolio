import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EDUCATIONS_LIMIT } from "../../constants";
import request from "../../server/request";

const initialState = {
  educations: [],
  loading: false,
  isModalLoading: false,
  total: 0,
};

export const getEducations = createAsyncThunk(
  "educations/fetching",
  async ({ search, page }) => {
    const params = {
      search,
      page,
      limit: EDUCATIONS_LIMIT,
    };
    const { data } = await request.get("education", { params });
    return data;
  }
);

export const getEducation = createAsyncThunk(
  "education/fetching",
  async (id) => {
    const { data } = await request.get(`education/${id}`);
    return data;
  }
);

export const addEducation = createAsyncThunk(
  "education/add",
  async (values) => {
    await request.post("education", values);
  }
);

export const editEducation = createAsyncThunk(
  "education/add",
  async ({ newValues, id }) => {
    await request.put(`education/${id}`, newValues);
  }
);

export const deleteEducation = createAsyncThunk(
  "education/delete",
  async (id) => {
    await request.delete(`education/${id}`);
  }
);

const educationSlice = createSlice({
  initialState,
  name: "education",
  extraReducers: (builder) => {
    builder
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEducations.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.educations = data;
          state.total = pagination?.total;
          state.loading = false;
        }
      )
      .addCase(getEducations.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEducation.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEducation.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addEducation.rejected, (state) => {
        state.loading = false;
      });
  },
});

const { name, reducer: educationReducer } = educationSlice;
export { name as educationName, educationReducer as default };
