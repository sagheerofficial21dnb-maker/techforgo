<?php
/**
 * The template for displaying the footer
 *
 * 3-column yellow footer with direct editorial contacts.
 *
 * @package TechForGo
 * @since 1.0.2
 */

?>

<footer id="colophon" class="tfg-site-footer" style="background: #FEF08A; border-top: 2px solid #EAB308; padding: 48px 0 32px; color: #1A1A1A;">
	<div class="tfg-container">
		<div class="tfg-footer-grid">
			<!-- Column 1: Brand & Editorial Mission -->
			<div class="tfg-footer-col">
				<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
					<?php dynamic_sidebar( 'footer-1' ); ?>
				<?php else : ?>
					<div class="tfg-footer-brand" style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
						<img src="<?php echo esc_url( home_url( '/favicon.svg' ) ); ?>" alt="TechForGo Logo" style="width: 32px; height: 32px; border-radius: 8px;" />
						<span style="font-size: 20px; font-weight: 800; color: #0F172A;">
							<span style="font-weight: 900;">tech</span>forgo
						</span>
					</div>
					<p class="tfg-footer-mission" style="color: #422006; font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
						<?php esc_html_e( 'TechForGo is an independent peer-reviewed technology journal delivering rigorous architectural analysis, hardware breakthroughs, cybersecurity diagnostics, and infrastructure engineering insights for researchers and practitioners.', 'techforgo' ); ?>
					</p>
					<div class="tfg-footer-meta-info" style="color: #713F12; font-size: 12px; font-weight: 600;">
						<span><?php esc_html_e( 'ISSN 2831-9042', 'techforgo' ); ?></span>
						<span aria-hidden="true">&middot;</span>
						<span><?php esc_html_e( 'Editorial Board', 'techforgo' ); ?></span>
					</div>
				<?php endif; ?>
			</div>

			<!-- Column 2: Subject Areas / Categories -->
			<div class="tfg-footer-col">
				<?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
					<?php dynamic_sidebar( 'footer-2' ); ?>
				<?php else : ?>
					<h4 class="tfg-footer-col-title" style="color: #1A1A1A; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;"><?php esc_html_e( 'Coverage Tracks', 'techforgo' ); ?></h4>
					<ul class="tfg-footer-links" style="list-style: none; padding: 0; margin: 0; font-size: 13px; line-height: 2;">
						<li><a href="<?php echo esc_url( home_url( '/category/artificial-intelligence/' ) ); ?>" style="color: #1A1A1A; font-weight: 600; text-decoration: none;"><?php esc_html_e( 'Artificial Intelligence', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/cloud-infrastructure/' ) ); ?>" style="color: #1A1A1A; font-weight: 600; text-decoration: none;"><?php esc_html_e( 'Cloud & DevOps', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/cybersecurity/' ) ); ?>" style="color: #1A1A1A; font-weight: 600; text-decoration: none;"><?php esc_html_e( 'Cyber Defense', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/hardware-architecture/' ) ); ?>" style="color: #1A1A1A; font-weight: 600; text-decoration: none;"><?php esc_html_e( 'Hardware Architecture', 'techforgo' ); ?></a></li>
						<li><a href="<?php echo esc_url( home_url( '/category/software-engineering/' ) ); ?>" style="color: #1A1A1A; font-weight: 600; text-decoration: none;"><?php esc_html_e( 'Software Engineering', 'techforgo' ); ?></a></li>
					</ul>
				<?php endif; ?>
			</div>

			<!-- Column 3: Contact & Publication Standards -->
			<div class="tfg-footer-col">
				<?php if ( is_active_sidebar( 'footer-3' ) ) : ?>
					<?php dynamic_sidebar( 'footer-3' ); ?>
				<?php else : ?>
					<h4 class="tfg-footer-col-title" style="color: #1A1A1A; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;"><?php esc_html_e( 'Editorial Office', 'techforgo' ); ?></h4>
					<p class="tfg-footer-contact-line" style="color: #422006; font-size: 12px; margin-bottom: 8px;">
						<strong style="color: #1A1A1A;"><?php esc_html_e( 'Email Desk:', 'techforgo' ); ?></strong>
						<a href="mailto:sagheerofficial21dnb@gmail.com" style="color: #0066CC; font-weight: 700; text-decoration: none;">sagheerofficial21dnb@gmail.com</a>
					</p>
					<p class="tfg-footer-contact-line" style="color: #422006; font-size: 12px; margin-bottom: 8px;">
						<strong style="color: #1A1A1A;"><?php esc_html_e( 'Phone / Helpline:', 'techforgo' ); ?></strong>
						<a href="tel:03069256639" style="color: #1A1A1A; font-weight: 700; text-decoration: none;">03069256639</a>
					</p>
					<p class="tfg-footer-contact-line" style="color: #422006; font-size: 12px; margin-bottom: 8px;">
						<strong style="color: #1A1A1A;"><?php esc_html_e( 'Newsroom Hours:', 'techforgo' ); ?></strong>
						<span><?php esc_html_e( 'Mon–Fri: 9:00 AM – 6:00 PM', 'techforgo' ); ?></span>
					</p>
					<div class="tfg-footer-standards" style="margin-top: 12px;">
						<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" style="color: #0F172A; font-weight: 800; font-size: 12px; text-decoration: underline;"><?php esc_html_e( 'Send Editorial Message &rarr;', 'techforgo' ); ?></a>
					</div>
				<?php endif; ?>
			</div>
		</div>

		<div class="tfg-footer-bottom" style="border-top: 1px solid #EAB308; padding-top: 24px; margin-top: 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 12px; color: #713F12;">
			<div class="tfg-copyright">
				&copy; <?php echo esc_html( date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php esc_html_e( 'All editorial rights reserved.', 'techforgo' ); ?>
			</div>
			<div class="tfg-footer-policy-links" style="display: flex; gap: 14px; font-weight: 600;">
				<a href="<?php echo esc_url( home_url( '/about/' ) ); ?>" style="color: #1A1A1A; text-decoration: none;"><?php esc_html_e( 'About Us', 'techforgo' ); ?></a>
				<span aria-hidden="true">&middot;</span>
				<a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" style="color: #1A1A1A; text-decoration: none;"><?php esc_html_e( 'Contact Us', 'techforgo' ); ?></a>
				<span aria-hidden="true">&middot;</span>
				<a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>" style="color: #1A1A1A; text-decoration: none;"><?php esc_html_e( 'Privacy Policy', 'techforgo' ); ?></a>
				<span aria-hidden="true">&middot;</span>
				<a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>" style="color: #1A1A1A; text-decoration: none;"><?php esc_html_e( 'Terms & Conditions', 'techforgo' ); ?></a>
				<span aria-hidden="true">&middot;</span>
				<a href="<?php echo esc_url( home_url( '/disclaimer/' ) ); ?>" style="color: #1A1A1A; text-decoration: none;"><?php esc_html_e( 'Disclaimer', 'techforgo' ); ?></a>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
