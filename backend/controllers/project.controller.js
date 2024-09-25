import Project from "../models/project.model.js";
import { uploadImage } from "./imageUpload.controller.js";
import mongoose from "mongoose";


export const addProject = async (req, res) => {
  const { title, htmlCode, cssCode, jsCode, author, penDetails, penTags, penVisibility, image } = req.body;

  try {
    // const id = new Date().getTime().toString();
    // const imageUrl = await uploadImage(image, id);
    const newProject = new Project({
      title,
      htmlCode,
      cssCode,
      jsCode,
      author,
      penDetails,
      penTags,
      penVisibility,
      // image: imageUrl
    })

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: 'Project Saved',
      data: newProject,
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, htmlCode, cssCode, jsCode, author } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid project ID'
    });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      { _id: id },
      { title, htmlCode, cssCode, jsCode, author },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Project Saved',
      data: updatedProject
    })

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('author', 'username profilePicture')

    if (projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No projects found',
      });
    }

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const getProject = async (req, res) => {
  const { id } = req.params;

  try {
    const projects = await Project.find({ author: id })

    if (!projects) {
      return res.status(404).json({
        success: false,
        message: 'No projects found',
      });
    }

    return res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findById({ _id: id })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not Found'
      })
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const searchProject = async (req, res) => {
  const { title } = req.query;

  try {
    const project = await Project.find({ title: { $regex: title, $options: 'i' } })

    if (project.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No projects found',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const searchUsersProject = async (req, res) => {
  try {
    const { title } = req.query;

    // Ensure title is provided
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title parameter is required',
      });
    }

    const userId = req.user.id;

    const projects = await Project.find({
      author: userId,
      title: { $regex: title, $options: 'i' }
    });

    if (!projects.length) {
      return res.status(404).json({
        success: false,
        message: 'No projects found',
      });
    }

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Error searching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};


export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findByIdAndDelete(id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}

export const savePenSetting = async (req, res) => {
  const { id } = req.params;
  const { penDetails, penTags, penVisibility } = req.body;

  try {
    const project = await Project.findByIdAndUpdate({ _id: id },
      { penDetails, penTags, penVisibility },
      { new: true, runValidators: true })

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: 'Internal Server Error'
    })
  }
}