import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import SplitPane from "react-split-pane";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProjectByIdQuery } from '../apis/project.Api';
import { useDispatch, useSelector } from 'react-redux';
import { setHtmlCode, setCssCode, setJsCode, setProjectId, setTitle, setPenDetails, setPenTags, setPenVisibility } from "../features/codeeditor/codeEditorSlice";
import { TbSlash } from 'react-icons/tb';
import { BsAsterisk } from 'react-icons/bs';
import { PiBracketsRoundBold, PiGearFill } from 'react-icons/pi';
import PenSetting from '../components/PenSetting';
import { IoIosArrowDown } from 'react-icons/io';

const ProjectPen = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const { data } = useGetProjectByIdQuery(id)
  const projectData = data?.data
  const [projectIds, setProjectIds] = useState('')
  const [htmlCodes, setHtmlCodes] = useState('');
  const [cssCodes, setCssCodes] = useState('');
  const [jsCodes, setJsCodes] = useState('');
  const [output, setOutput] = useState('');
  const { layoutIndex, penDetails, penTags, penVisibility } = useSelector((state) => state.codeEditor);
  const [penSetting, setPenSetting] = useState(false)

  useEffect(() => {
    dispatch(setProjectId(projectIds))
  }, [projectIds, dispatch])

  useEffect(() => {
    if (projectData) {
      setHtmlCodes(projectData.htmlCode || '')
      setCssCodes(projectData.cssCode || '')
      setJsCodes(projectData.jsCode || '')
      setProjectIds(projectData._id)
      setTitle(projectData.title)
      setPenDetails(projectData.penDetails)
      setPenTags(projectData.penTags)
      setPenVisibility(projectData.penVisibility)
    }
  }, [projectData])


  useEffect(() => {
    dispatch(setHtmlCode(htmlCodes));
    dispatch(setCssCode(cssCodes));
    dispatch(setJsCode(jsCodes));
    dispatch(setProjectId(projectIds))
    dispatch(setTitle(projectData?.title))
    dispatch(setPenDetails(projectData?.penDetails))
    dispatch(setPenTags(projectData?.penTags))
    dispatch(setPenVisibility(projectData?.penVisibility))
  }, [htmlCodes, cssCodes, jsCodes, projectIds, dispatch, projectData, penDetails, penTags, penVisibility]);

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
          ${cssCodes}
          </style>
        </head>
        <body>
          ${htmlCodes}
          <script>${jsCodes}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  }, [htmlCodes, cssCodes, jsCodes]);

  return (
    <div className="w-full h-[90vh] flex flex-col items-start justify-start overflow-hidden bg-black text-white">
      <div className="h-full w-full">
        <SplitPane split={layoutIndex === 1 ? "horizontal" : "vertical"} maxSize={-100} minSize={100} defaultSize={"50%"} paneStyle={{ display: "flex" }}>
          {
            layoutIndex === 2 && (
              <div className="h-full w-full bg-white">
                <iframe title="Result" srcDoc={output} className="h-full w-full" sandbox="allow-scripts" />
              </div>
            )
          }
          <SplitPane split={layoutIndex === 1 ? "vertical" : "horizontal"}>
            {/* HTML Editor */}
            <div className="w-full h-full border border-zinc-900 bg-[#1D1E22] flex flex-col border-l-[14px] border-l-black">
              <div className="flex justify-between bg-black">
                <h4 className="font-lato font-semibold uppercase bg-[#1D1E22] text-zinc-300 text-[17px] p-2 px-3 flex items-center gap-2 border-t-[2px] border-[#34363E]">
                  <span className="bg-[#FF3C41] text-black p-[2px] rounded-[4px]"><TbSlash className="text-[13px] font-bold" /></span>HTML
                </h4>
                <div className="flex gap-2 items-center pr-2">
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /></span>
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm"><IoIosArrowDown /></span>
                </div>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <CodeMirror value={htmlCodes} theme="dark" extensions={[html()]} onChange={(value) => {
                  setHtmlCodes(value);
                  // dispatch(setHtmlCode(value))
                }} />
              </div>
            </div>

            {/* CSS Editor */}
            <div className="border border-zinc-900 w-full bg-[#1D1E22] h-full flex flex-col">
              <div className="flex justify-between bg-black">
                <h4 className="font-lato font-semibold uppercase bg-[#1D1E22] text-zinc-300 text-[17px] p-2 px-3 flex items-center gap-2 border-t-[2px] border-[#34363E]">
                  <span className="bg-[#0EBEFF] text-black p-[2px] rounded-[4px]"><BsAsterisk className="text-[13px] font-bold" /></span>CSS
                </h4>
                <div className="flex gap-2 items-center pr-2">
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm" onClick={() => setPenSetting((prev) => !prev)}><PiGearFill /></span>
                  <span className="bg-[#444857] p-1 text-[12px] px-[6px] cursor-pointer rounded-sm"><IoIosArrowDown /></span>
                </div>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <CodeMirror value={cssCodes} theme="dark" extensions={[css()]} onChange={(value) => {
                  setCssCodes(value)
                  // dispatch(setCssCode(value))
                }} />
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
                <CodeMirror value={jsCodes} theme="dark" extensions={[javascript({ jsx: true })]} onChange={(value) => {
                  setJsCodes(value)
                  // dispatch(setJsCode(value))
                }} />
              </div>
            </div>
          </SplitPane>

          {/* Output */}
          {
            layoutIndex !== 2 && (
              <div className="h-full w-full bg-white">
                <iframe title="Result" srcDoc={output} className="h-full w-full" sandbox="allow-scripts" />
              </div>
            )
          }
        </SplitPane>
      </div>
      {
        penSetting ? <PenSetting setPenSetting={setPenSetting} projectId={id} /> : ''
      }
    </div>
  );
}
export default ProjectPen