// services/templateService.ts
import { db, collection, getDocs, query, where, WhereFilterOp } from '../../cf.firebase';

interface Template {
  id: string;
  title: string;
  slug: string;
  framework: string;
  category: string;
  price: string;
  isPremium: boolean;
  imageUrl: string;
  downloads: number;
  rating: number;
  gitCloneLink: string;
  createdAt: Date;
}

interface FilterCondition {
  field: string;
  operator: WhereFilterOp;
  value: string | boolean | number;
}

const fetchTemplates = async (filters: FilterCondition[] = []): Promise<Template[]> => {
  try {
    const templatesRef = collection(db, 'tn_templates');
    let q = query(templatesRef);

    // Appliquer les filtres si fournis
    if (filters.length > 0) {
      filters.forEach(filter => {
        q = query(q, where(filter.field, filter.operator, filter.value));
      });
    }

    const querySnapshot = await getDocs(q);
    const templates: Template[] = [];

    querySnapshot.forEach(doc => {
      const data = doc.data();
      templates.push({
        id: doc.id,
        title: data.title,
        slug: data.slug,
        framework: data.framework,
        category: data.category,
        price: data.price,
        isPremium: data.isPremium,
        imageUrl: data.imageUrl,
        downloads: data.downloads,
        rating: data.rating,
        gitCloneLink: data.gitCloneLink,
        createdAt: data.createdAt.toDate()
      });
    });

    return templates;
  } catch (error) {
    console.error("Error fetching templates: ", error);
    throw error;
  }
};

export { fetchTemplates };
export type { Template, FilterCondition };