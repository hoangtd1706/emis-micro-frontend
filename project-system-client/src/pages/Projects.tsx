import React, { FC } from "react";
import { Link } from "react-router-dom";
import ImgSrc from "./../assets/user.svg";

import projectService, { ProjectModel } from "../services/project.service";

import userService from "../services/user.service";
import { Button, Card, Col, Input, Row, Space, Typography } from "antd";
import { GridTemplateStl, SearchBarHomeStl } from "../components/styled";
import styled from "styled-components";
import { projectFeatures } from "../components/project.route";
import ProjectCard from "../components/ProjectCard";

const Projects: FC = function () {
  const [projects, setProjects] = React.useState<ProjectModel[]>([]);
  const [text, setText] = React.useState<string>("");

  const [isMod, setMod] = React.useState(false);

  const refresh = async () => {
    try {
      // setProjects(await projectService.getMyProjects());
    } catch {
    } finally {
    }
  };

  React.useEffect(() => {
    refresh();
    checkIsMod();
  }, []);

  const checkIsMod = async () => {
    try {
      // setMod(await userService.checkModRolePermission());
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <SearchBarHomeStl>
        <Space>
          <Input.Search
            style={{
              maxWidth: "500px",
              width: "100%",
            }}
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          {isMod && (
            <Link to={`/mod`} style={{ textDecoration: "none" }}>
              <Button type="primary">Admin</Button>
            </Link>
          )}
        </Space>
      </SearchBarHomeStl>
      <GridTemplateStl xl={6} lg={3} xs={1}>
        {projects
          .filter(
            (x) =>
              x.code.toUpperCase().includes(text.toUpperCase()) ||
              x.name.toUpperCase().includes(text.toUpperCase())
          )
          .map((p) => (
            <ProjectCard model={p} />
          ))}
      </GridTemplateStl>
    </>
  );
};

export default Projects;
