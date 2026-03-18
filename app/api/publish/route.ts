import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Basic validation (optional)
    if (!data.site || !data.nav) {
      return NextResponse.json({ error: 'Invalid content data' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'content', 'content.yaml');
    
    // Convert JSON to YAML
    const yamlString = yaml.dump(data, {
      indent: 2,
      lineWidth: -1, // Don't wrap lines
      noRefs: true
    });
    
    await writeFile(filePath, yamlString, 'utf8');
    
    return NextResponse.json({ success: true, message: 'Content published successfully' });
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Failed to publish content' }, { status: 500 });
  }
}
