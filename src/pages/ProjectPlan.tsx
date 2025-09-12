import ProjectHeader from "@/components/ProjectHeader";
import ProblemStatement from "@/components/ProblemStatement";
import SolutionArchitecture from "@/components/SolutionArchitecture";
import TechStack from "@/components/TechStack";
import FeatureList from "@/components/FeatureList";
import DeploymentPlan from "@/components/DeploymentPlan";
import ChallengesAndMitigation from "@/components/ChallengesAndMitigation";
import ActionPlan from "@/components/ActionPlan";

const ProjectPlan = () => {
  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader />
      <ProblemStatement />
      <SolutionArchitecture />
      <TechStack />
      <FeatureList />
      <DeploymentPlan />
      <ChallengesAndMitigation />
      <ActionPlan />
    </div>
  );
};

export default ProjectPlan;