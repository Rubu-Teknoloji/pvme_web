import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔸 Dinamik URL parametresiyle API isteği

// const BASE_URL = "https://admin.goygoy.app/api/web/info?url=";
const BASE_URL = "https://admin.pvme.net/api/pvme/template?url=";

// 🔸 Dinamik URL parametresiyle GET isteği
export const fetchWebInfo = createAsyncThunk("webInfo/fetchWebInfo", async (incomingUrl) => {
  const response = await axios.get(`${BASE_URL}${encodeURIComponent(incomingUrl)}`);
  return response.data;
});

// 🔹 POST isteği (yeni eklendi)
export const sendVideoTracking = createAsyncThunk(
  "webInfo/sendVideoTracking",
  async ({trackingData}, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://admin.pvme.net/api/pvme/tracking",{trackingData});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Tracking bilgisi gönderme hatası");
    }
  }
);
// 🔹 POST isteği Question Gönder (yeni eklendi)
export const sendQuestion = createAsyncThunk(
  "webInfo/sendQuestion",
  async ({questionData}, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://admin.pvme.net/api/pvme/set-answer", {
        questionData
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Cevap bilgisi gönderme hatası");
    }
  }
);

const webInfoSlice = createSlice({
  name: "webInfo",
  initialState: {
    data: null,
    loading: false,
    error: null,
    trackingCode:null,
    trackingResponse: null,
    trackingLoading: false,
    trackingError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.trackingCode=action.payload.trackingCode
      })
      .addCase(fetchWebInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // POST (Video Tracking)
      .addCase(sendVideoTracking.pending, (state) => {
        state.trackingLoading = true;
        state.trackingError = null;
      })
      .addCase(sendVideoTracking.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.trackingResponse = action.payload;
      })
      .addCase(sendVideoTracking.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingError = action.payload;
      })
      // POST (Video Tracking)
      .addCase(sendQuestion.pending, (state) => {
        state.trackingLoading = true;
        state.trackingError = null;
      })
      .addCase(sendQuestion.fulfilled, (state, action) => {
        state.trackingLoading = false;
        state.trackingResponse = action.payload;
      })
      .addCase(sendQuestion.rejected, (state, action) => {
        state.trackingLoading = false;
        state.trackingError = action.payload;
      });
  },
});

export default webInfoSlice.reducer;
