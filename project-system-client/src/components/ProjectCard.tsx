import React from "react"
import { styled } from "styled-components"
import { ProjectModel } from "../services/project.service"
import { Typography } from "antd"
import { projectFeatures } from "./project.route"
import { Link } from "react-router-dom"

const CardStl = styled.div`
  display: flex;
  flex-flow:column nowrap;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 8px 12px;
`

const CardHeaderStl = styled.div`
  display:flex;
  flex-flow:column nowrap;
  span:last-child{
    font-size: 16px;
  }
`

const CardBodyStl = styled.div`
  display: flex;
  flex-flow:row wrap;
  margin-top: 10px;
  gap: 6px 16px;
`

type ProjectCardType = {
    model: ProjectModel
}

export default function ProjectCard({ model }: ProjectCardType): JSX.Element {
    return (<CardStl>
        <CardHeaderStl>
            <Typography.Text type="secondary">
                {model.name}
            </Typography.Text>
            <Typography.Text >
                {model.code}
            </Typography.Text>
        </CardHeaderStl>
        <CardBodyStl>
            {projectFeatures.map(f => (
                <Link style={{
                    textDecoration: "none",

                }} key={f.path} to={`/projects/${model.code}/${f.path}`}>
                    <Typography.Link>{f.icon}<span style={{ marginLeft: "4px" }}>{f.label}</span></Typography.Link>
                </Link>
            ))}
        </CardBodyStl>
    </CardStl>)
}