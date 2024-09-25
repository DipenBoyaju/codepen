import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHtmlCode, setCssCode, setJsCode, setProjectId, setTitle, setPenDetails, setPenTags, resetProjectId } from "../features/codeeditor/codeEditorSlice";
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import SplitPane from "react-split-pane";
import { EditorView } from '@codemirror/view';
import { IoIosArrowDown } from "react-icons/io";
import { PiBracketsRoundBold, PiGearFill } from "react-icons/pi";
import { TbSlash } from "react-icons/tb";
import { BsAsterisk } from "react-icons/bs";
import PenSetting from "../components/PenSetting";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from '../apis/project.Api';

const NewPen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { htmlCode, cssCode, jsCode, layoutIndex, projectId } = useSelector((state) => state.codeEditor);
  const [output, setOutput] = useState();
  const [penSetting, setPenSetting] = useState(false);
  const outputRef = useRef(null);
  const { data } = useGetProjectByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (id || projectId) {
      const projectData = data?.data;
      if (projectData) {
        dispatch(setHtmlCode(projectData.htmlCode || ''));
        dispatch(setCssCode(projectData.cssCode || ''));
        dispatch(setJsCode(projectData.jsCode || ''));
        dispatch(setProjectId(projectData._id));
        dispatch(setTitle(projectData.title));
        dispatch(setPenDetails(projectData.penDetails));
        dispatch(setPenTags(projectData.penTags));
      }
    } else {
      dispatch(resetProjectId());
      dispatch(setHtmlCode(''));
      dispatch(setCssCode(''));
      dispatch(setJsCode(''));
    }
  }, [data, id, dispatch, projectId]);

  useEffect(() => {
    const combinedOutput = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>
          body{
          margin: 0;
          }
          ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode}
          <script>${jsCode}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  }, [htmlCode, cssCode, jsCode]);

  return (
    <div className="w-full h-[90vh] flex flex-col items-start justify-start overflow-hidden bg-black text-white">
      <div className="h-full w-full">
        <SplitPane split={layoutIndex === 1 ? "horizontal" : "vertical"} maxSize={-100} minSize={100} defaultSize={"50%"} paneStyle={{ display: "flex" }}>
          {layoutIndex === 2 && (
            <div className="h-full w-full bg-white">
              <iframe title="Result" srcDoc={output} className="h-full w-full" sandbox="allow-scripts" />
            </div>
          )}
          <SplitPane split={layoutIndex === 1 ? "vertical" : "horizontal"}>
            {/* HTML Editor */}
            <div className="w-full h-full border border-zinc-900 bg-[#1D1E22] flex flex-col">
              <div className="flex justify-between bg-black">
                <h4 className="font-lato font-semibold uppercase bg-[#1D1E22] text-zinc-300 text-[17px] p-2 px-3 flex items-center gap-2 border-t-[2px] border-[#34363E]">
                  <span className="bg-[#FF3C41] text-black p-[2px] rounded-[4px]"><TbSlash className="text-[13px] font-bold" /></span> HTML
                </h4>
                <div className="flex gap-2 items-center pr-2">
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /></span>
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm"><IoIosArrowDown /></span>
                </div>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <CodeMirror value={htmlCode} theme="dark" extensions={[html(), EditorView.lineWrapping]} onChange={(value) => dispatch(setHtmlCode(value))} />
              </div>
            </div>

            {/* CSS Editor */}
            <div className="border border-zinc-900 w-full bg-[#1D1E22] h-full flex flex-col">
              <div className="flex justify-between bg-black">
                <h4 className="font-lato font-semibold uppercase bg-[#1D1E22] text-zinc-300 text-[17px] p-2 px-3 flex items-center gap-2 border-t-[2px] border-[#34363E]">
                  <span className="bg-[#0EBEFF] text-black p-[2px] rounded-[4px]"><BsAsterisk className="text-[13px] font-bold" /></span> CSS
                </h4>
                <div className="flex gap-2 items-center pr-2">
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /></span>
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm"><IoIosArrowDown /></span>
                </div>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <CodeMirror value={cssCode} theme="dark" extensions={[css(), EditorView.lineWrapping]} onChange={(value) => dispatch(setCssCode(value))} />
              </div>
            </div>

            {/* JS Editor */}
            <div className="border border-zinc-900 w-full bg-[#1D1E22] h-full flex flex-col">
              <div className="flex justify-between bg-black">
                <h4 className="font-lato font-semibold uppercase bg-[#1D1E22] text-zinc-300 text-[17px] p-2 px-3 flex items-center gap-2 border-t-[2px] border-[#34363E]">
                  <span className="bg-[#FCD000] text-black p-[2px] rounded-[4px]"><PiBracketsRoundBold className="text-[13px] font-bold" /></span> JS
                </h4>
                <div className="flex gap-2 items-center pr-2">
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /></span>
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm"><IoIosArrowDown /></span>
                </div>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <CodeMirror value={jsCode} theme="dark" extensions={[javascript({ jsx: true }), EditorView.lineWrapping]} onChange={(value) => dispatch(setJsCode(value))} />
              </div>
            </div>
          </SplitPane>

          {/* Output */}
          {layoutIndex !== 2 && (
            <div className="h-full w-full bg-white" ref={outputRef}>
              <iframe title="Result" srcDoc={output} className="h-full w-full" sandbox="allow-scripts" />
            </div>
          )}
        </SplitPane>
      </div>
      {
        penSetting ? <PenSetting setPenSetting={setPenSetting} projectId={id} projectData={data} /> : ''
      }
    </div>
  );
};

export default NewPen;
