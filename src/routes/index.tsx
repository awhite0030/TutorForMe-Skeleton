import { createFileRoute } from "@tanstack/react-router";
import { TutorApp } from "../../app-web/src/TutorApp";

export const Route = createFileRoute("/")({ component: TutorApp });
