import PostsRepository from "./postsRepository";
import GitHubRepository from "./gitHubRepository";
import UsgsRepository from "./UsgsRepository";

const repositories = {
  posts: PostsRepository,
  gitHub: GitHubRepository,
  earthquakes: UsgsRepository
  // other repositories ...
};

export const RepositoryFactory = {
  get: name => repositories[name]
};
