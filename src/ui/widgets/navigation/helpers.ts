export const addWorkspace = (
  workspace: string,
  workspaceList: string[],
  setWorkspaceList: React.Dispatch<React.SetStateAction<string[]>>,
  setWorkspace: React.Dispatch<React.SetStateAction<string>>,
) => {
  //trim is removing any extra white spaces
  //if input is not empty then create a new workspace item
  if (workspace.trim() !== '') {
    //creating a new workspace array including previous workspaces and the new one & set the workspaceList array to this new array
    setWorkspaceList([...workspaceList, workspace.trim()]);
    setWorkspace(''); //empty the input
  }
};

export const deleteWorkspace = (
  index: number,
  workspaceList: string[],
  setWorkspaceList: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  //filter() creates a new array with all elements that meet the conditions implemented by the provided function
  //set the workspaceList to a new array containing all previous workspaces except for the one at the index passed in
  setWorkspaceList(workspaceList.filter((_, i) => i !== index));
};
