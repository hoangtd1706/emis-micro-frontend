import React, { FC } from "react";
import { Link } from "react-router-dom";
import ImgSrc from './../assets/user.svg'

import projectService, { ProjectModel } from "../services/project.service";

import userService from "../services/user.service";
import { Card, Col, Row } from "antd";

const Projects: FC = function () {

  const [projects, setProjects] = React.useState<ProjectModel[]>([]);
  const [text, setText] = React.useState<string>("");

  const [isMod, setMod] = React.useState(false);

  const refresh = async () => {
    try {
      setProjects(await projectService.getMyProjects());
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
      setMod(await userService.checkModRolePermission());
    } catch (error) {
      return false;
    }
  };

  return (
    <div >
      <Row gutter={16}>
        {projects
          .filter(
            (x) =>
              x.code.toUpperCase().includes(text.toUpperCase()) ||
              x.name.toUpperCase().includes(text.toUpperCase())
          )
          .map((p) => (
            <Col key={p.code} span={6}>

              <Card title={p.name}>{p.name}</Card>
            </Col>
          ))}
      </Row>
    </div >
  );
};

export default Projects;
