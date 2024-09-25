import { createSlice } from "@reduxjs/toolkit";

const codeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState: {
    htmlCode: '',
    cssCode: '',
    jsCode: '',
    projectId: '',
    title: 'Untitled',
    penDetails: '',
    penTags: '',
    image: '',
    penVisibility: true,
    penAutoSave: false,
    layoutIndex: '1',
    captureScreenshot: false,
  },
  reducers: {
    setProjectId: (state, action) => {
      state.projectId = action.payload
    },
    setHtmlCode: (state, action) => {
      state.htmlCode = action.payload
    },
    setCssCode: (state, action) => {
      state.cssCode = action.payload
    },
    setJsCode: (state, action) => {
      state.jsCode = action.payload
    },
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setPenDetails: (state, action) => {
      state.penDetails = action.payload
    },
    setImage: (state, action) => {
      state.image = action.payload
    },
    setPenVisibility: (state, action) => {
      state.penVisibility = action.payload;
    },
    setPenAutoSave: (state, action) => {
      state.penAutoSave = action.payload;
    },
    setPenTags: (state, action) => {
      state.penTags = action.payload;
    },
    setLayoutIndex: (state, action) => {
      state.layoutIndex = action.payload;
    },
    setCaptureScreenshot: (state, action) => {
      state.captureScreenshot = action.payload;
    },
    resetTitle: (state) => {
      state.title = 'Untitled';
    },
    resetProjectId: (state) => {
      state.projectId = ''
    }
  }
})

export const { setHtmlCode, setCssCode, setJsCode, setTitle, setProjectId, setPenDetails, setPenVisibility, setPenAutoSave, setPenTags, setImage, setLayoutIndex, setCaptureScreenshot, resetTitle, resetProjectId } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;