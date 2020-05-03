import { Transforms } from "slate";
import { Trigger } from "../../plugins/Trigger";

export const TodoListDateTrigger: Trigger = {
  pattern: /\{(\d+)(hours|days)\} /,
  range: "line-before",
  onMatch: ({ editor }, matches, plugin) => {
    if (matches[0].regexMatch) {
      const { dateFormatter } = plugin;
      const amount = Number(matches[0].regexMatch[1]);
      const unit = matches[0].regexMatch[2];
      const dueDate = dateFormatter(createDate(amount, unit as any));
      Transforms.setNodes(editor, { dueDate });
    }
  },
};

type TimeUnit = "hours" | "days";

const createDate = (amount: number, unit: TimeUnit) => {
  const now = new Date();
  switch (unit) {
    case "hours":
      now.setHours(now.getHours() + amount);
      return now;
    case "days":
      now.setDate(now.getDate() + amount);
      return now;
  }
};
