import React from 'react';
import { Table, TableHead, TableRow, TableBody, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RestoreIcon from '@mui/icons-material/Restore';

import { getDateFromISODate } from '../../Utility/dateUtility';
import { BoldedTableCell, ContentTableCell } from '../../Utility/tableCellStyles';

const ProjectTable = ({ projects, projectDetails, editProject, handleRestoreProject }) => {
  const navigate = useNavigate();

  return (
    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
      <TableHead>
        <TableRow>
          <BoldedTableCell>Title</BoldedTableCell>
          <BoldedTableCell sx={{ fontWeight: 600 }} align="right">
            Submitted By
          </BoldedTableCell>
          <BoldedTableCell align="right">Created At</BoldedTableCell>
          <BoldedTableCell align="center">Actions</BoldedTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {projects &&
          projects.map((project) => (
            <TableRow key={project._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <ContentTableCell component="th" scope="row">
                {project.title}
              </ContentTableCell>
              <ContentTableCell align="right">{project.name}</ContentTableCell>
              <ContentTableCell align="right">{getDateFromISODate(project.createdAt)}</ContentTableCell>
              <ContentTableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                {projectDetails && (
                  <Tooltip title="View" disableInteractive>
                    <IconButton onClick={() => navigate(`/projectDetails/${project._id}`)}>
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}
                {editProject && (
                  <Tooltip title="Edit" disableInteractive>
                    <IconButton onClick={() => navigate(`/editProject/${project._id}`)}>
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                )}

                {handleRestoreProject && (
                  <Tooltip title="Restore" disableInteractive>
                    <IconButton onClick={() => handleRestoreProject(project._id)}>
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </ContentTableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default ProjectTable;
