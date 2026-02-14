'use client';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dynamic from 'next/dynamic';

// Create enhanced styles with colors, borders, and better layout
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#f8fafc',
  },
  container: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 10,
    padding: 25,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    marginBottom: 25,
    paddingBottom: 15,
    borderBottomWidth: 3,
    borderBottomColor: '#ef4444',
    borderBottomStyle: 'dashed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  paragraphContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 5,
  },
  image: {
    marginVertical: 20,
    borderRadius: 12,
    width: 200,
    borderWidth: 3,
    borderColor: '#10b981',
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#94a3b8',
    borderTopStyle: 'solid',
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 8,
  },
  card: {
    backgroundColor: '#f1f5f9',
    borderLeftWidth: 4,
    borderLeftColor: '#8b5cf6',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
  },
  highlightBox: {
    backgroundColor: '#dbeafe',
    borderWidth: 2,
    borderColor: '#60a5fa',
    padding: 20,
    marginVertical: 15,
    borderRadius: 10,
  },
});

// Color variations for different paragraphs
const paragraphColors = [
  { bg: '#f0f9ff', border: '#0ea5e9', text: '#0369a1' }, // Blue
  { bg: '#fef2f2', border: '#f87171', text: '#b91c1c' }, // Red
  { bg: '#f0fdf4', border: '#4ade80', text: '#15803d' }, // Green
  { bg: '#fefce8', border: '#facc15', text: '#a16207' }, // Yellow
  { bg: '#faf5ff', border: '#c084fc', text: '#7c3aed' }, // Purple
];

const MyDocument = () => (
  <Document title="Enhanced_Document.pdf" author="React PDF">
    <Page size="TABLOID" style={styles.page}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.title}>Enhanced PDF Document</Text>
          <Text style={styles.subtitle}>
            A beautifully styled PDF with colors, borders, and modern design
          </Text>
        </View>

        {/* Information Card */}
        <View style={styles.card}>
          <Text style={{ fontSize: 11, color: '#475569', marginBottom: 5 }}>
            Document Features:
          </Text>
          <View
            style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}
          >
            <Text style={styles.badge}>Colorful Design</Text>
            <Text style={styles.badge}>Styled Borders</Text>
            <Text style={styles.badge}>Modern Layout</Text>
            <Text style={styles.badge}>Responsive</Text>
          </View>
        </View>

        {/* Highlight Box */}
        <View style={styles.highlightBox}>
          <Text
            style={{
              fontSize: 13,
              color: '#1e40af',
              fontWeight: 'bold',
              marginBottom: 8,
            }}
          >
            Important Notice
          </Text>
          <Text style={{ fontSize: 10, color: '#1e40af', lineHeight: 1.4 }}>
            This document demonstrates advanced PDF styling capabilities using
            React PDF renderer. All colors, borders, and layouts are fully
            customizable.
          </Text>
        </View>

        {/* Colored Paragraphs */}
        <Image
          src="https://res.cloudinary.com/husnain0120/image/upload/v1770063871/admission/idProof/silu2ut45ru2yzocv15q.png"
          style={styles.image}
        />
        {paragraphColors.map((color, index) => (
          <View
            key={index}
            style={[
              styles.paragraphContainer,
              {
                backgroundColor: color.bg,
                borderColor: color.border,
                borderStyle: index % 2 === 0 ? 'solid' : 'dashed',
              },
            ]}
          >
            <Text style={[styles.text, { color: color.text }]}>
              Paragraph {index + 1} - This paragraph features a{' '}
              {color.text.substring(1)} themed design with custom background and
              border styling.
            </Text>
            {/* Image Section */}
            <Text
              style={[
                styles.text,
                { color: color.text, fontSize: 10, fontStyle: 'italic' },
              ]}
            >
              Each paragraph has unique colors, borders, and styling for visual
              variety.
            </Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Page 1 of 1 • Generated on {new Date().toLocaleDateString()} • React
            PDF
          </Text>
          <Text style={[styles.footerText, { marginTop: 5 }]}>
            This is a styled footer with border separation
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

// Dynamically import PDFViewer with no SSR
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then(mod => mod.PDFViewer),
  { ssr: false }
);

export default function PDFPage() {
  return (
    <div
      style={{
        height: '100vh',
      }}
    >
      <PDFViewer
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <MyDocument />
      </PDFViewer>
    </div>
  );
}
