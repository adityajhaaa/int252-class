/**
 * About Page
 * Platform overview, mission, and vision
 */

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Evolve
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Transforming education through technology and innovation
          </p>
        </div>

        {/* Mission */}
        <section className="max-w-3xl mx-auto mb-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            We believe that quality education should be accessible to everyone, everywhere.
            Our mission is to democratize learning by providing world-class courses taught
            by industry experts at affordable prices.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We empower learners to achieve their goals, whether that's career advancement,
            personal growth, or simply mastering a new skill.
          </p>
        </section>

        {/* Vision */}
        <section className="max-w-3xl mx-auto mb-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            We envision a world where learning is continuous, accessible, and transformative.
            A world where anyone can learn anything at any time, breaking down barriers of
            geography, socioeconomic status, and time constraints.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            By combining cutting-edge technology with engaging pedagogy, we're building
            the future of education.
          </p>
        </section>

        {/* Values */}
        <section className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Quality',
                description: 'We maintain the highest standards of educational content and instructor expertise.',
              },
              {
                title: 'Accessibility',
                description: 'We ensure our platform and courses are accessible to learners of all backgrounds.',
              },
              {
                title: 'Innovation',
                description: 'We continuously innovate to improve the learning experience with new features.',
              },
              {
                title: 'Community',
                description: 'We foster a supportive community where learners can connect and grow together.',
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="max-w-3xl mx-auto bg-blue-600 text-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <p className="text-blue-100">Active Learners</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <p className="text-blue-100">Expert Instructors</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-100">Courses Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8★</div>
              <p className="text-blue-100">Average Rating</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
