import React, { FC } from "react";
import { Link } from "react-router-dom";

import projectService, { ProjectModel } from "../../services/project.service";
import { GridTemplateStl } from "../../components/styled";
import ProjectCard from "../../components/ProjectCard";



const ProjectsMod: FC = function () {

    const [projects, setProjects] = React.useState<ProjectModel[]>([]);
    const [text, setText] = React.useState<string>("");

    const refresh = async () => {
        // setStatus(true, "Đang tải dữ liệu ...");
        try {
            setProjects(await projectService.getAll());
        } catch {
            // showAlert("error", "Tải dữ liệu thất bại!");
        } finally {
            // setStatus(false, "");
        }
    };

    React.useEffect(() => {
        refresh();
    }, []);

    return (
        <GridTemplateStl xl={6} lg={3} xs={1} >

            {projects
                .filter(
                    (x) =>
                        x.code.toUpperCase().includes(text.toUpperCase()) ||
                        x.name.toUpperCase().includes(text.toUpperCase())
                )
                .map((p) => (
                    <ProjectCard model={p} />
                    // <Grid key={p.code} item xs={12} md={4} lg={3}>
                    //     <Card className={classes.card} variant="outlined">
                    //         <CardContent>
                    //             <Typography
                    //                 className={classes.title}
                    //                 color="textSecondary"
                    //                 gutterBottom
                    //             >
                    //                 {p.name}
                    //             </Typography>
                    //             <Typography
                    //                 variant="h5"
                    //                 component="h2"
                    //                 className={classes.code}
                    //             >
                    //                 {p.code}
                    //             </Typography>
                    //         </CardContent>
                    //         <CardActions>
                    //             <Grid container spacing={1}>
                    //                 <Grid item>
                    //                     <Link
                    //                         to={`/project-system/mod/${p.code}/members`}
                    //                         style={{ textDecoration: "none" }}
                    //                     >
                    //                         <IconButton text="Phân quyền" icon="user-cog" />
                    //                     </Link>
                    //                 </Grid>
                    //             </Grid>
                    //         </CardActions>
                    //     </Card>
                    // </Grid>
                ))}
        </GridTemplateStl>
    );
};

export default ProjectsMod;
