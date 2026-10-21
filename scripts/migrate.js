import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_bfk2EpLWdTP6@ep-dawn-pond-b4s9oozq-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require';

async function migrate() {
  console.log('Connecting to Neon PostgreSQL...');
  const sql = neon(connectionString);

  const schemaPath = path.resolve(process.cwd(), 'schema.sql');
  console.log(`Reading SQL from ${schemaPath}...`);
  const schemaSql = fs.readFileSync(schemaPath, 'utf8');

  // Split into executable statements, ignoring comments and empty lines
  // Note: Neon serverless HTTP sql tag can execute individual queries or blocks.
  // In PostgreSQL, multiple statements can be run or run individually.
  console.log('Executing schema and seed queries on Neon...');
  
  // Remove single line comments and split by semicolon
  const cleanedSql = schemaSql
    .split('\n')
    .map(line => {
      const idx = line.indexOf('--');
      return idx >= 0 ? line.slice(0, idx) : line;
    })
    .join('\n');

  const statements = cleanedSql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  console.log(`Executing ${statements.length} statements on Neon...`);
  for (let i = 0; i < statements.length; i++) {
    const stmt = statements[i];
    try {
      await sql.query(stmt);
      process.stdout.write(`.` );
    } catch (innerErr) {
      console.error(`\nError at statement ${i + 1}:`, innerErr.message);
      console.error('Statement:', stmt.substring(0, 150));
      throw innerErr;
    }
  }
  console.log('\nAll statements executed successfully!');

  // Verify by querying v_full_timetable
  console.log('Verifying table data...');
  const result = await sql`SELECT count(*) FROM v_full_timetable`;
  console.log('v_full_timetable count:', result[0]);

  const teachers = await sql`SELECT count(*) FROM teachers`;
  console.log('teachers count:', teachers[0]);

  const credits = await sql`SELECT * FROM team_credits`;
  console.log('team_credits:', credits);

  console.log('All migrations completed successfully on Neon PostgreSQL! 🎉');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
