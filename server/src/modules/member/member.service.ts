import { createDataSource } from '../../common/utils/dataSource';
import { Member } from '../../entities/MemberModel';

export const getMemberRepository = async () => {
  const dataSource = await createDataSource();

  return await dataSource.getRepository(Member);
};
