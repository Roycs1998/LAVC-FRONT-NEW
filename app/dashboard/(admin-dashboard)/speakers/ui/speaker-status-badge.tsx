import { Badge } from "@/components/ui/badge";
import { EntityStatus } from "@/modules/common/types";
import { SPEAKER_STATUS_LABELS } from "@/modules/speaker/contants";

interface Props {
  status: EntityStatus;
}

const SpeakerStatusBadge = ({ status }: Props) => {
  const label = SPEAKER_STATUS_LABELS[status] ?? status;

  return <Badge>{label}</Badge>;
};

export default SpeakerStatusBadge;
