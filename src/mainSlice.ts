import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface JobState {
  jobs: { id: string; col: string, jobTitle: string, sourceLink: string, company: string }[];
}

const initialState: JobState = {
  jobs: [],
};

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<any>) => {
      state.jobs.push(action.payload);
    },
    updateJobColumn: (state, action: PayloadAction<{ id: string; column: string }>) => {
      const job = state.jobs.find((job) => job.id === action.payload.id);
      if (job) {
        job.col = action.payload.column;
      }
    },
    deleteJob: (state, action) => {
      const updatedJobs = state.jobs.filter((job) => job.id !== action.payload);
      state.jobs = updatedJobs
    },
    clearBoard: (state) => {
      state.jobs = []
    }
  },
});

export const { addJob, updateJobColumn,deleteJob,clearBoard } = jobSlice.actions;

export default jobSlice.reducer;
